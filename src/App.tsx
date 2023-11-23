import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from './hooks/useStore'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon, CopyIcon } from './Components/Icons'
import { LenguageSelector } from './Components/LenguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './Components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

function App() {
  const {
    fromLanguage,
    setFromLanguage,
    toLanguage,
    setToLanguage,
    interchangeLanguages,
    fromText,
    result,
    setFromText,
    setResult,
    loading
  } = useStore()

  const debouncedFromText = useDebounce(fromText, 500)

  const handleCopy = () => {
    // copy text to clipboard
    navigator.clipboard.writeText(result).catch(() => { console.log('error') })
  }

  useEffect(() => {
    if (debouncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('Error') })
  }, [debouncedFromText, fromLanguage, toLanguage])

  return (
    <>
      <Container fluid>
        <h1 className='text-center pb-2'>Google Translate</h1>
        <Row>
          <Col>
            <Stack gap={2}>
              <LenguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage} />
              <TextArea
                loading={loading}
                type={SectionType.From}
                value={fromText}
                onChange={setFromText}
              />
            </Stack>
          </Col>
          <Col xs="auto">
            <Button variant="link"
              disabled={fromLanguage === AUTO_LANGUAGE}
              onClick={interchangeLanguages}
            ><ArrowsIcon></ArrowsIcon></Button>
          </Col>
          <Col>
            <Stack gap={2}>
              <LenguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage} />
              <div style={{ position: 'relative' }}>
                <TextArea
                  loading={loading}
                  type={SectionType.To}
                  value={result}
                  onChange={setResult}
                />
                <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                  <Button variant='link' onClick={handleCopy}>
                    <CopyIcon />
                  </Button>
                </div>
              </div>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default App
