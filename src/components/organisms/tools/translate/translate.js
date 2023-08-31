import { Link } from 'react-router-dom'
import ROUTES from '../../../../common/routes/routes'
import { rowClickHandler } from '../../home/row/utils/utils'
import { useTranslation } from './custom-hooks/custom-hooks'

const Translate = ({ inputText, from = 'en', to = 'hi', openSnackbar, searchText, start, end, philosopherFullName, index, philosopherFullName_i10n, darkMode }) => {
    const translationOutput = useTranslation({ inputText, from, to })
    const philosopherFullnameIn_SelectedLanguage = philosopherFullName_i10n[to]

    return translationOutput !== '' && translationOutput !== undefined && translationOutput ? (
        <>
            <div key={index} onClick={rowClickHandler.bind(this, { openSnackbar, searchText, start, end, quote: translationOutput, philosopherFullName: philosopherFullnameIn_SelectedLanguage, index })}>
                {translationOutput} ― {philosopherFullnameIn_SelectedLanguage}
            </div>
            <div>
                <button style={{ marginTop: '10px' }}>
                    <Link to={ROUTES.image.route} state={{ quotationText: translationOutput, philosopherFullName: philosopherFullnameIn_SelectedLanguage, signature: 'इंस्टाग्राम: @jaaginsaan' }} style={{ textDecoration: 'none', color: darkMode ? '#fff' : '#000', marginTop: '10px' }}>
                        Download Hindi Image
                    </Link>
                </button>
            </div>
        </>
    ) : null
}

export default Translate
