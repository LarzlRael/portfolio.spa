import { useIntl, FormattedMessage } from 'react-intl'
import { useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { useForm } from '../hooks/useForm'
import { serverAPI } from '../api/server'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { IoRefreshCircleOutline } from 'react-icons/io5'
import { useThemeStore } from '../store/useThemeStore'

export const FormContact = () => {
  const intl = useIntl()

  const [themeColors, isDarkMode] = useThemeStore((state) => [
    state.themeColors,
    state.isDarkMode,
  ])

  const { email, name, message, onChange } = useForm({
    email: '',
    name: '',
    message: '',
  })
  const [sending, setSending] = useState(false)

  const onHandleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      setSending(true)
      const { status } = await serverAPI.post('/email', {
        name,
        from: email,
        message,
      })

      setSending(false)

      if (status === 200) {
        return toast.success(
          intl.formatMessage({ id: 'app.messageSentSuccess' }),
          {
            position: 'top-right',
            autoClose: 3500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            closeButton: false,
          },
        )
      }
    } catch (error) {
      setSending(false)

      return toast.error(intl.formatMessage({ id: 'app.messageSentError' }), {
        position: 'top-right',
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: false,
      })
    }
  }

  return (
    <div className="FormContact" id="contact">
      <h2
        style={{
          color: themeColors.primaryColor,
        }}
      >
        <FormattedMessage id="app.contact" />
      </h2>
      <form onSubmit={onHandleSubmit}>
        <div className="flex">
          <input
            type="text"
            className="FormContact__input"
            placeholder={intl.formatMessage({ id: 'app.name' })}
            onChange={({ target }) => onChange(target.value, 'name')}
            value={name}
          />
          <input
            type="email"
            className="FormContact__input"
            placeholder={intl.formatMessage({ id: 'app.email' })}
            onChange={({ target }) => onChange(target.value, 'email')}
            value={email}
          />
        </div>
        <textarea
          className="FormContact__input--area"
          placeholder={intl.formatMessage({ id: 'app.message' })}
          onChange={({ target }) => onChange(target.value, 'message')}
          value={message}
        ></textarea>
        <div className="button-container">
          <button
            className={`buttonSend pointer ${isDarkMode ? 'light' : 'dark'}`}
            disabled={sending}
          >
            {!sending ? (
              <FormattedMessage id="app.send" />
            ) : (
              <IoRefreshCircleOutline
                width="80px"
                height="30px"
                color="white"
                rotate="true"
              />
            )}
          </button>

          <ToastContainer />
        </div>
      </form>
    </div>
  )
}
