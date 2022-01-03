import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react/cjs/react.production.min';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
	return (
		<Fragment>
			<Head>
				<title>React Meetups</title>
				<meta name='description' content='Search for react meetups' />
			</Head>
			<MeetupList meetups={props.meetups} />
		</Fragment>
	);
};

// export async function getServerSideProps(context) {
// 	const res = context.res;
// 	const req = context.req;
// 	// fetch data
// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	};
// }

export async function getStaticProps() {
	const client = await MongoClient.connect(
		'mongodb+srv://artursem:to0A1je75MsJ9SZu@cluster0.qa4m5.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	const db = client.db();
	const meetupsCollection = db.collection('meetups');
	const meetups = await meetupsCollection.find().toArray();
	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 1,
	};
}

export default HomePage;
