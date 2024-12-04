import express from 'express';
import { verifyUser } from '../utils/verifyUser.js';
import { createListing, deleteLisitng, getListing } from '../controller/listing.controller.js';

const listRouter = express.Router();

listRouter.post('/create', verifyUser, createListing);
listRouter.delete('/delete/:id', verifyUser, deleteLisitng);
listRouter.get('/:id', getListing);

export default listRouter