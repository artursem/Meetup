import { MongoClient } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react/cjs/react.production.min';
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
	{
		id: 'm1',
		title: 'A First Meetup',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Ratusz_wroclaw.JPG/1280px-Ratusz_wroclaw.JPG',
		address: 'Rynek 14, 50-505 Wrocław',
		descrption: 'This is a first meetup',
	},
	{
		id: 'm2',
		title: 'A Second Meetup',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/5/5f/Stare_Miasto_w_Poznaniu.jpg',
		address: 'Rynek 14, 50-505 Poznań',
		descrption: 'This is a second meetup',
	},

	{
		id: 'm3',
		title: 'A Third Meetup',
		image:
			'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Krak%C3%B3w%2C_Sukiennice_%2820190218%29.jpg/800px-Krak%C3%B3w%2C_Sukiennice_%2820190218%29.jpg',
		address: 'Rynek 14, 50-505 Kraków',
		descrption: 'This is a third meetup',
	},
];

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
