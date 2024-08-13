import { Form, FormSelectProps } from 'react-bootstrap-5'
import {
  FormControl as BS3FormControl,
  FormControlProps as BS3FormControlProps,
} from 'react-bootstrap'
import BootstrapVersionSwitcher from '@/features/ui/components/bootstrap-5/bootstrap-version-switcher'
import { getAriaAndDataProps } from '@/features/utils/bootstrap-5'

type OLFormSelectProps = FormSelectProps & {
  bs3Props?: Record<string, unknown>
}

function OLFormSelect(props: OLFormSelectProps) {
  const { bs3Props, ...bs5Props } = props

  const bs3FormSelectProps: BS3FormControlProps = {
    bsSize: bs5Props.size,
    name: bs5Props.name,
    value: bs5Props.value,
    disabled: bs5Props.disabled,
    onChange: bs5Props.onChange as BS3FormControlProps['onChange'],
    required: bs5Props.required,
    placeholder: bs5Props.placeholder,
    className: bs5Props.className,
    ...bs3Props,
  }

  // Get all `aria-*` and `data-*` attributes
  const extraProps = getAriaAndDataProps(bs5Props)

  return (
    <BootstrapVersionSwitcher
      bs3={
        <BS3FormControl
          componentClass="select"
          {...bs3FormSelectProps}
          {...extraProps}
        />
      }
      bs5={<Form.Select {...bs5Props} />}
    />
  )
}

export default OLFormSelect
