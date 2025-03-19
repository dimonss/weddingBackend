import express from 'express';
import GuestSQL from './db/guestSQL.js';
import { commonDto } from './DTO/common.js';
import { STATUS } from './constants.js';
import { getCurrentDate } from './utils/commonUtils.js';
import dotenv from 'dotenv';

dotenv.config();

const HOSTNAME = process.env.HOSTNAME;
const PORT = process.env.PORT || 4000;

const app = express();
const startApp = async () => {
    try {
        app.listen(PORT, HOSTNAME, () => {
            console.log(`Server started on ${PORT} port`);
        });
    } catch (e) {
        console.log('e');
        console.log(e);
    }
    app.use(express.json());
    // CORS config
    // app.use((req, res, next) => {
    //     res.append('Access-Control-Allow-Origin', ['*']);
    //     res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    //     res.append('Access-Control-Allow-Headers', 'Content-Type,Auth,auth');
    //     next();
    // });

    app.get('/guest/:uuid', (req, res) => {
        const uuid = req?.params?.uuid;
        console.log(uuid);
        GuestSQL.find(uuid, (error, item) => {
            if (error) {
                res.json(commonDto(STATUS.NOT_FOUND, 'user not found'));
                return;
            }
            res.json(commonDto(STATUS.OK, 'success', item));
        });
    });
    app.post('/guest_approve/:uuid', (req, res) => {
        const uuid = req?.params?.uuid;
        console.log(uuid);
        const respDate = getCurrentDate();
        GuestSQL.updateStatus({ uuid, respStatus: true, respDate }, (error, product) => {
            if (error) {
                res.json(commonDto(STATUS.NOT_FOUND, 'user not found'));
                return;
            }
            res.json(commonDto(STATUS.OK, 'success', product));
        });
    });
    app.post('/guest_reject/:uuid', (req, res) => {
        const uuid = req?.params?.uuid;
        console.log(uuid);
        const respDate = getCurrentDate();
        GuestSQL.updateStatus({ uuid, respStatus: false, respDate }, (error, product) => {
            if (error) {
                res.json(commonDto(STATUS.NOT_FOUND, 'user not found'));
                return;
            }
            res.json(commonDto(STATUS.OK, 'success', product));
        });
    });
};

startApp();
