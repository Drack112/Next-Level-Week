import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import {
	convertHourStringToMinutes,
	convertMinutesToHourString,
} from './utils/time-conversions';

const app = express();

app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
	log: ['query'],
});

app.get('/games', async (req, res) => {
	const games = await prisma.game.findMany({
		include: {
			_count: { select: { ads: true } },
		},
	});
	return res.json(games);
});

app.post('/games/:id/ads', async (req, res) => {
	const gameId = req.params.id;
	const body = req.body;
	const adCreated: any = await prisma.ad.create({
		data: {
			gameId,
			name: body.name,
			yearsPlaying: body.yearsPlaying,
			discord: body.discord,
			weekDays: body.weekDays.join(','),
			hoursStart: convertHourStringToMinutes(body.hoursStart),
			hoursEnd: convertHourStringToMinutes(body.hoursEnd),
			useVoiceChannel: body.useVoiceChannel,
			createdAt: body.createdAt,
		},
	});
	return res.status(201).json(adCreated);
});

app.get('/games/:id/ads', async (req, res) => {
	const gameId = req.params.id;
	const game = await prisma.game.findFirst({
		where: {
			id: gameId,
		},
	});
	if (!game) {
		return res.status(404).json([]);
	}

	const ads = await prisma.ad.findMany({
		select: {
			id: true,
			name: true,
			yearsPlaying: true,
			weekDays: true,
			hoursStart: true,
			hoursEnd: true,
			useVoiceChannel: true,
		},
		where: {
			gameId: game.id,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
	return res.json(
		ads.map((ad) => {
			return {
				...ad,
				weekDays: ad.weekDays.split(','),
				hoursStart: convertMinutesToHourString(ad.hoursStart),
				hoursEnd: convertMinutesToHourString(ad.hoursEnd),
			};
		})
	);
});

app.get('/ads/:id/discord', async (req, res) => {
	const adId = req.params.id;

	const adDiscord = await prisma.ad
		.findUniqueOrThrow({
			select: {
				discord: true,
			},
			where: {
				id: adId,
			},
		})
		.catch((err) => {
			return res.status(404).json({
				error: '404',
				message: 'Anúncio não encontrado',
			});
		});

	return res.json(adDiscord);
});

app.listen(3333, () => {
	console.log('Server started on port 3333');
});

module.exports = app;
