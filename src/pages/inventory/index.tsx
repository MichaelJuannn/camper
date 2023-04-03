import { useSession } from 'next-auth/react';
import useSWR, { Fetcher } from 'swr';

interface Item {
	id: string;
	name: string;
	orderId: string;
}

const fetcher: Fetcher<Item[], string> = (url: any) =>
	fetch(url).then((res) => res.json());

export default function Inventory() {
	const { data, error, isLoading } = useSWR('/api/inventory', fetcher);
	const session = useSession();
	console.log(session);
	if (session.status !== 'authenticated') return 'who are you KEKG';
	if (isLoading) return 'LOADING';
	if (error) return error;
	return (
		<>
			<div>
				<h1>welcome {session.data.user?.name}</h1>
			</div>
			<div>
				{data?.map((item, index) => (
					<div key={index} className={item.id}>
						{item.name}
						<a href={`/inventory/${item.id}`}>go to page</a>
					</div>
				))}
			</div>
		</>
	);
}
