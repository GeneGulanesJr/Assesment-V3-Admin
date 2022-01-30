import { FormLabel } from '@chakra-ui/react'
import { Field } from 'formik'
import React from 'react'


export default function Select(props) {
    const { label, name, options } = props
    return (
        <div>
            <FormLabel>{label}</FormLabel>
            <Field as='select' id={name} name={name} className="chakra-input css-1c6j008">
                {
                    options.map(option => {
                        return (
                            <option
                                className='chakra-select css-k7r2wc'
                                key={option.value}
                                value={option.value}
                            >
                                {option.key}
                            </option>
                        )
                    })
                }
            </Field>
        </div>
    )
}