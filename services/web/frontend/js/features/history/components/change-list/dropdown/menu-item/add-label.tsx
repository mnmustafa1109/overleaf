import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import OLDropdownMenuItem from '@/features/ui/components/ol/ol-dropdown-menu-item'
import OLTagIcon from '@/features/ui/components/ol/icons/ol-tag-icon'
import AddLabelModal from '../../add-label-modal'
import DropdownListItem from '@/features/ui/components/bootstrap-5/dropdown-list-item'

type DownloadProps = {
  projectId: string
  version: number
  closeDropdown: () => void
}

function AddLabel({
  version,
  projectId,
  closeDropdown,
  ...props
}: DownloadProps) {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)

  const handleClick = () => {
    closeDropdown()
    setShowModal(true)
  }

  return (
    <DropdownListItem>
      <OLDropdownMenuItem
        onClick={handleClick}
        leadingIcon={<OLTagIcon />}
        as="button"
        className="dropdown-item-material-icon-small"
        {...props}
      >
        {t('history_label_this_version')}
      </OLDropdownMenuItem>
      <AddLabelModal
        show={showModal}
        setShow={setShowModal}
        version={version}
      />
    </DropdownListItem>
  )
}

export default AddLabel
