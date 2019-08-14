import * as wol from "node-wol";
import express from "express";

import { environment } from './environment';

const app = express();

app.get('/:target', (req, res) => {
    if (environment.configs.mac[req.params.target]) {
        wol.wake(environment.configs.mac[req.params.target], environment.configs, (error) => {
            if (error) {
                res.status(400).send(error);
                console.error(error);
            }
            console.log(`${req.params.target}: ${environment.configs.mac[req.params.target]}`);
            res.status(200).send(`OK`);
        });
    } else {
        res.status(400).send('no target');
    }
});

const port = 1258;
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});