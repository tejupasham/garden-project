'use client'

import { InputHTMLAttributes } from 'react'
import { Input } from './ui/input'

type InputFieldAdditionalProps = {
	label: string
	error?: string
}

export default function InputField(
	props: InputHTMLAttributes<HTMLInputElement> & InputFieldAdditionalProps
) {
	return (
		<div className="space-y-1">
			<label htmlFor={props.id}>{props.label}</label>
			<Input
				type={props.type ?? 'text'}
				name={props.name}
				id={props.id}
				value={props.value}
				onChange={props.onChange}
				onBlur={props.onBlur}
			/>
			{props.error && <small className="text-red-500">{props.error}</small>}
		</div>
	)
}
