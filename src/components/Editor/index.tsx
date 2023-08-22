import { useEffect, type FC, useState } from 'react'
import ReactQuill, { type ReactQuillProps } from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface Props {
	options?: ReactQuillProps
}
const Editor: FC<Props> = (props: Props) => {
	const [option, setOption] = useState<ReactQuillProps>({})
	const { options = option } = props
	const handleImage = () => {}
	useEffect(() => {
		const modules: ReactQuillProps['modules'] = {
			toolbar: {
				container: [
					[{ header: [1, 2, 3, 4, 5, 6, false] }],
					['bold', 'italic', 'underline', 'strike'], // toggled buttons
					['blockquote', 'code-block'],
					[{ header: 1 }, { header: 2 }], // custom button values
					[{ list: 'ordered' }, { list: 'bullet' }],
					[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
					[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
					[{ direction: 'rtl' }], // text direction

					[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
					[{ color: [] }, { background: [] }], // dropdown with defaults from theme
					[{ font: [] }],
					[{ align: [] }],
					['image'],
					['clean']
				],
				handlers: {
					image: handleImage
				}
			}
		}

		// 富文本编辑器的配置
		const option: ReactQuillProps = {
			modules,
			placeholder: '请输入内容',
			readOnly: false,
			theme: 'snow',
			bounds: '#editor' // 限制编辑区域
		}
		setOption(option)
	}, [])

	return <ReactQuill {...options}></ReactQuill>
}

export default Editor
