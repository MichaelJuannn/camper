import { GetServerSideProps } from 'next';
import prisma from '@/utils/prisma';

interface ItemProps {
	item: {
		id: string;
		name: string;
		orderId?: string;
	};
}

export default function Id({ item }: ItemProps) {
	console.log(item);

	return (
		<>
			<div>{item.id}</div>
			<div>{item.name}</div>
		</>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { id } = ctx.query;
	if (typeof id !== 'string') return { props: { error: 'need a string' } };
	const item = await prisma.inventory.findFirst({
		where: {
			id: id,
		},
		include: { orders: true },
	});
	console.log(item);
	return {
		props: { item },
	};
};
