'use client';

import React, {
	FC,
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
} from 'react';
import { AuthCodeProps, AuthCodeRef, AuthInputProps } from './auth-code.types';
import classNames from 'classnames';

const AuthCode = forwardRef<AuthCodeRef, AuthCodeProps>(
	(
		{
			variant = 'ghost',
			autoFocus = true,
			className,
			isDisabled,
			length = 5,
			onChange,
		},
		ref
	) => {
		if (length < 1) {
			throw new Error('تعداد ارقام باید بزرگتر از صفر باشد');
		}

		const inputsRef = useRef<Array<HTMLInputElement>>([]);

		const inputProps: AuthInputProps = {
			min: '0',
			max: '9',
			pattern: '[0-9]{1}',
		};

		useEffect(() => {
			if (autoFocus) {
				inputsRef.current[0].focus;
			}
		}, [autoFocus]);

		const sendResult = () => {
			const result = inputsRef.current.map((input) => input.value).join('');
			onChange(result);
		};

		const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			console.log('on change');
			const {
				target: { value, nextElementSibling },
			} = e;

			if (value.match(inputProps.pattern)) {
				if (nextElementSibling !== null) {
					(nextElementSibling as HTMLInputElement).focus();
				}
			} else {
				e.target.value = '';
			}

			sendResult();
		};

		const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
			e.target.select();
		};

		const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
			const { key } = e;

			const target = e.target as HTMLInputElement;
			if (key === 'Backspace') {
				if (target.value === '') {
					if (target.previousElementSibling !== null) {
						const previousElement =
							target.previousElementSibling as HTMLInputElement;
						previousElement.value = '';
						previousElement.focus();
					}
				} else {
					target.value = '';
				}
			}

			sendResult();
		};

		useImperativeHandle(ref, () => ({
			focus: () => {
				if (inputsRef.current) {
					inputsRef.current[0].focus();
				}
			},
			clear: () => {
				if (inputsRef.current) {
					for (let i = 0; i < inputsRef.current.length; i++) {
						inputsRef.current[i].value = '';
					}

					inputsRef.current[0].focus();
				}

				sendResult();
			},
		}));

		const classes = classNames('textbox flex-1 w-1 text-center', {
			[`textbox-${variant}`]: variant,
		});

		const handleOnPaste = (e: React.ClipboardEvent) => {
			e.preventDefault();
			const pastedCode = e.clipboardData.getData('text');
			if (/^\d+$/.test(pastedCode)) {
				const digits = pastedCode.split('');
				for (
					let i = 0;
					i < digits.length && i < inputsRef.current.length;
					i++
				) {
					inputsRef.current[i].value = digits[i];
				}
				sendResult();
			}
		};

		const inputs = [];
		for (let i = 0; i < length; i++) {
			inputs.push(
				<input
					type="text"
					maxLength={1}
					className={classes}
					disabled={isDisabled}
					onChange={handleOnChange}
					onFocus={handleOnFocus}
					onKeyDown={handleOnKeyDown}
					onPaste={handleOnPaste}
					ref={(element: HTMLInputElement) => {
						return (inputsRef.current[i] = element);
					}}
				/>
			);
		}

		return (
			<>
				<div className={`flex gap-4 flex-row-reverse `}>{inputs}</div>
			</>
		);
	}
);
AuthCode.displayName = 'AuthCode'; //setting display name
export default AuthCode;
