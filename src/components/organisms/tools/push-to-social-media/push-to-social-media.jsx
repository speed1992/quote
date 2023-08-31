import { removeReadData } from '../../../../common/utils/staticDataUtils'
import { schedulePost } from './utils/utils'

const PushToSocialMedia = ({ index, currentPhilosopher, scheduledPosts, setScheduledQuotes, setCurrentData, currentData, markedQuotes, setMarkedQuotes }) => {
    const clickHandler = () => {
        schedulePost({ index, currentPhilosopher, scheduledPosts, setScheduledQuotes })
        removeReadData({ index, setCurrentData, currentData, currentPhilosopher, markedQuotes, setMarkedQuotes })
    }
    return <button onClick={clickHandler}>Insta Push</button>
}

export default PushToSocialMedia
