import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const order_deadline = new Date(req.body.order_deadline + 'Z');
	const order_start = new Date(Date.now());
}
