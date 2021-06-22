import { Settings } from 'components'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Col, Row } from 'reactstrap'
const { displayName } = require('../package.json')
const PWAPrompt = dynamic(() => import('../components/Prompt'), { ssr: false })

export default function Home() {
  const router = useRouter()

  return (
    <>
      <div className="py-3">
        <Row noGutters className="px-3">
          <Col xs="12" md="6" className="text-center">
            <img
              src="/static/mf_logo_blue.png"
              className="w-75 p-3"
              alt="Massachusetts Division of Marine Fisheries"
            />
          </Col>
          <Col
            xs="12"
            md="6"
            className="mt-3 mt-md-0 text-center align-self-center"
          >
            <img
              src="/static/mb_logo.jpg"
              className="w-75 p-3"
              alt="Massachusetts Bays National Estuary Partnership"
            />
          </Col>
        </Row>
        <Col>
          <p>
            The Massachusetts Division of Marine Fisheries (MA DMF) and the
            Massachusetts Bays National Estuary Partnership (MassBays) developed
            this web application to facilitate data collection of seagrass
            presence and health by citizen and professional scientists. This app
            is intended to be used alongside the written protocol, available
            here.
          </p>
        </Col>
        <Col xs="12" className="my-3">
          <a
            href="/static/protocol.pdf"
            className="btn btn-info w-100"
            target="_blank"
          >
            View Protocol (PDF)
          </a>
        </Col>
        <Col xs="12" className="my-3">
          <Link href="/trips/list">
            <a className="btn btn-lg btn-primary w-100">Go to your trips</a>
          </Link>
        </Col>
        <Col xs="12" className="my-3">
          <Link href="/data">
            <a className="btn btn-info w-100">Download Trip Data</a>
          </Link>
        </Col>
      </div>
      <Settings />
      <PWAPrompt
        timesToShow={3}
        delay={500}
        permanentlyHideOnDismiss={false}
        copyBody={`${displayName} has app functionality. Add it to your home screen to use while offline.`}
      />
    </>
  )
}
