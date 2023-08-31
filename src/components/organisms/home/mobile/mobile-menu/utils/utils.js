import { API_ENDPOINTS } from '../../../../../../common/apis/apiEndpoints'
import { retryTenTimes } from '../../../../../../common/utils/apiUtils'

export const sendUserDetails = async ({ userName, markedQuotes, openSnackbar, setSyncDate }) => {
    await retryTenTimes(async () => {
        return await fetch(API_ENDPOINTS.MARKED_QUOTES.BACKUP, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userName,
                markedQuotes,
                dateSynced: Date.now(),
            }),
        })
    })
}

export const getUserDetails = async ({ userName, markedQuotes, openSnackbar, setMarkedQuotes }) => {
    let response = await retryTenTimes(
        async () =>
            await fetch(API_ENDPOINTS.MARKED_QUOTES.RESTORE, {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userName,
                }),
            })
    )

    response = await response.json()
    if (response?.ok) {
        try {
            const markedQuotesFromServer = response?.results?.[0]?.markedQuotes
            const markedQuotesFromServerCount = Object.values(markedQuotesFromServer).flat().length
            if (markedQuotesFromServer && markedQuotesFromServerCount > 0) {
                return { markedQuotesFromServer, dateFromServer: response?.results?.[0]?.dateSynced }
                // setMarkedQuotes(response?.results?.[0]?.markedQuotes)
            }
        } catch (error) {
            openSnackbar(JSON.stringify(error))
        }
    } else {
        openSnackbar(JSON.stringify(response.error))
    }
}

export const loginRegister = async ({ apiCallType, userName, password, setIsLoggedIn, openSnackbar, setIsFetching }) => {
    const capitalizedUserName = userName.charAt(0).toUpperCase() + userName.slice(1)
    let response
    setIsFetching(true)
    if (apiCallType === 'login') {
        response = await retryTenTimes(
            async () =>
                await fetch(API_ENDPOINTS.USER.LOGIN, {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userName,
                        password,
                    }),
                })
        )
    } else {
        response = await retryTenTimes(
            async () =>
                await fetch(API_ENDPOINTS.USER.CREATE, {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userName,
                        password,
                    }),
                })
        )
    }

    response = await response.json()
    setIsFetching(false)

    if (response?.ok) {
        setIsLoggedIn(true)
        openSnackbar(capitalizedUserName + ' ' + JSON.stringify(response.serverResponse))
    } else {
        openSnackbar(JSON.stringify(response.error))
    }
}
