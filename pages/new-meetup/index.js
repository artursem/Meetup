// our-domain.com/new-meetup
import { useRouter } from 'next/router';
import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { Fragment } from 'react';

function NewMeetupPage() {
	const router = useRouter();

	async function addMeetupHandler(enteredMeetupData) {
		const response = await fetch('/api/new-meetup', {
			method: 'POST',
			body: JSON.stringify(enteredMeetupData),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();

		console.log(data);

		router.push('/');
	}

	return (
		<Fragment>
			<Head>
				<title>Add new meetup</title>
				<meta name='description' content='Add new meetup' />
			</Head>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />
		</Fragment>
	);
}

export default NewMeetupPage;
