import ProfileFunc from '../../components/ProfileFunc/ProfileFunc'
import StatisticBoard from '../../components/StatisticBoard/StatisticBoard'

const ProfilePage = () => {
	return (
		<div className={`${window.innerWidth>600?'w-[80%]':''}`}>
			<ProfileFunc />
			<StatisticBoard />
		</div>
	)
}

export default ProfilePage
