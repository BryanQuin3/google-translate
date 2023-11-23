import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

interface Props {
    type: SectionType
    loading?: boolean
    onChange: (value: string) => void
    value: string
}

const commonStyle = { border: 0, height: '180px', width: '300px', resize: 'none' }

const getPleaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
    if (type === SectionType.From) return 'Introducir texto'
    if (loading === true) return 'Traduciendo...'
    return 'Traducción'
}

export const TextArea = ({ type, loading, onChange, value }: Props) => {
    const styles = type === SectionType.To
        ? { ...commonStyle, backgroundColor: '#f5f5f5', position: 'relative' }
        : commonStyle

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event.target.value)
    }
    return (
        <Form.Control
            as="textarea"
            autoFocus={type === SectionType.From}
            style={styles}
            value={value}
            placeholder={getPleaceholder({ type, loading })}
            onChange={handleChange}
            disabled={type === SectionType.To}
        />
    )
}
