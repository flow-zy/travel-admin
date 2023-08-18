import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
	easing: 'ease',
	speed: 300,
	showSpinner: true,
	minimum: 0.1,
	trickleSpeed: 200
})

export default NProgress
