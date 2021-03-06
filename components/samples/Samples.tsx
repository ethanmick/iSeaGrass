import { FlexFill } from 'components/FlexFill'
import { Camera, Check, ChevronRight, Circle } from 'components/Icon'
import { compact } from 'lodash'
import {
  IndicatorShoot,
  Sample,
  validIndicatorShoot,
  validSample
} from 'models'
import Link from 'next/link'
import { Button, ListGroup } from 'reactstrap'

interface BlankSlateProps {
  onClick: (e: React.MouseEvent) => any
  disableCreate: boolean
}

const BlankSlate: React.FC<BlankSlateProps> = ({
  onClick,
  disableCreate
}: BlankSlateProps) => (
  <div className="bg-light p-5 text-center">
    <div style={{ fontSize: '1.25rem' }}>No Indicator Samples</div>
    <Button
      onClick={onClick}
      color="link"
      disabled={disableCreate}
      aria-label="Add Indicator Sample"
    >
      Add Indicator Sample
    </Button>
  </div>
)

interface SampleItemProps {
  i: number
  sample: Sample
}

const SampleShootSummary = (shoot: IndicatorShoot, i: number) =>
  validIndicatorShoot(shoot) ? null : `Shoot ${i + 1} incomplete`

const SampleItem = ({ i, sample }: SampleItemProps) => {
  const incomplete = compact(sample.shoots.map(SampleShootSummary))
  return (
    <li className="list-group-item">
      <Link
        href={{
          pathname: '/trips/stations/samples',
          query: { id: sample.id, i }
        }}
        as={`/trips/stations/samples?id=${sample.id}&i=${i}`}
      >
        <a className="text-dark d-flex justify-content-start align-items-center">
          {validSample(sample) ? (
            <Check width=".75rem" height=".75rem" className="text-success" />
          ) : (
            <Circle width=".75rem" height=".75rem" />
          )}
          <div className="ml-3">
            <div>Indicator Sample {i + 1}</div>
            <small className="text-danger">{incomplete.join(', ')}</small>
            {incomplete.length > 0 ? <> &bull; </> : null}
            <Camera
              className={
                sample.picture && sample.pictureTakenAt ? '' : 'text-danger'
              }
            />
          </div>
          <FlexFill />
          <ChevronRight />
        </a>
      </Link>
    </li>
  )
}

export interface SamplesProps {
  samples: Sample[]
  onCreate: (e: React.MouseEvent) => void
  disableCreate?: boolean
}

export const SampleList: React.FC<SamplesProps> = ({
  samples,
  onCreate,
  disableCreate
}: SamplesProps) => {
  if (!samples || samples.length == 0) {
    return <BlankSlate onClick={onCreate} disableCreate={disableCreate} />
  }
  return (
    <>
      <ListGroup flush>
        {samples.map((s, i) => (
          <SampleItem i={i} sample={s} key={i} />
        ))}
      </ListGroup>
    </>
  )
}

export const Samples = ({ disableCreate, samples, onCreate }: SamplesProps) => (
  <>
    <div className="mb-1 mt-2 px-3 d-flex justify-content-between">
      <Button
        aria-label="Add Sample"
        color="primary"
        outline={true}
        onClick={onCreate}
        disabled={disableCreate}
      >
        Add Sample
      </Button>
    </div>
    <SampleList
      samples={samples}
      onCreate={onCreate}
      disableCreate={disableCreate}
    />
  </>
)
