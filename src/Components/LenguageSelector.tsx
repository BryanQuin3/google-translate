/* eslint-disable react/prop-types */
import { SUPPORTED_LANGUAGES, AUTO_LANGUAGE } from '../constants'
import { Form } from 'react-bootstrap'
import { SectionType, type FromLanguage, type Language } from '../types.d'

type Props =
    | { type: SectionType.From, value: FromLanguage, onChange: (lenguage: FromLanguage) => void }
    | { type: SectionType.To, value: Language, onChange: (lenguage: Language) => void }

export const LenguageSelector: React.FC<Props> = ({ onChange, type, value }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Language)
    }
    return (
        <Form.Select aria-label='Selecciona el idioma' onChange={handleChange} value={value}>
            {type === SectionType.From && <option value={AUTO_LANGUAGE}>Auto</option>}
            {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                <option key={key} value={key}>{literal}</option>
            ))}
        </Form.Select>
    )
}
