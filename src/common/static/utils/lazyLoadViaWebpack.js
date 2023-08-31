// export const lazyLoadAsset = (philosopherName, { options, setOptions }, setQuotesLoaded, callbacks) => {
//     return new Promise((resolve, reject) => {
//         const fileName = philosopherName.toLowerCase()
//         retryTenTimes(() => import('../assets/quotes/' + fileName + '.json'))
//             .then((data) => {
//                 callbacks && callbacks.map((callback) => callback(data?.default))
//                 addPhilosopherInGlobalData(philosopherName, { options, setOptions }, data?.default)
//                 setQuotesLoaded(true)
//                 resolve()
//             })
//             .catch((e) => reject(e))
//     })
// }

// export const lazyLoadAllAssets = (callback) => {
//     return new Promise((resolve, reject) => {
//         const promiseArray = []
//         PHILOSOPHERS_DATA.forEach(({ value: philosopherName, fullName: philosopherFullName }) => {
//             if (philosopherName !== 'ALL') {
//                 const fileName = philosopherName.toLowerCase()
//                 const promise = retryTenTimes(() => import('../assets/quotes/' + fileName + '.json'))
//                     .then((data) => {
//                         callback && callback()
//                         const convertedQuotes = convertQuoteArray(data?.default, philosopherFullName)
//                         addPhilosopherInGlobalData('ALL', convertedQuotes)
//                     })
//                     .catch((e) => console.log(e))
//                 promiseArray.push(promise)
//             }
//         })

//         Promise.all(promiseArray).then(resolve).catch(reject)
//     })
// }
