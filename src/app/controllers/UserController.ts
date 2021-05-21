import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

class UserController {

    index(req: Request, res: Response) {
        return res.json({ message: 'ok' });
    }

    async store(req: Request, res: Response) {

        const repository = getRepository(User);

        const { email, password } = req.body;

        // verificando se o email já está cadastrado
        const userExists = await repository.findOne({ where: { email } })

        if (userExists) {
            return res.status(409).json({message: 'user email alredy exists!'});
        }

        const user = repository.create({ email, password });
        await repository.save(user);

        return res.json(user);

    }

    async list(req: Request, res: Response) {

        const respository = getRepository(User);

        const allUsers = await respository.createQueryBuilder("users").getMany();

        return res.json({users: allUsers});
    }

    async findByEmail(req: Request, res: Response) {

        const { email } = req.params;

        const repository = getRepository(User);

        const user = await repository.createQueryBuilder("users")
        .where("users.email = :email", { email })
        .getOne();

        if (user === null) 
            return res.status(400).json({message: 'user does not exists'});
        

        return res.json(user);
    }

    async update(req: Request, res: Response) {

        const { id } = req.params;
        const { email, password } = req.body;

        const repository = getRepository(User);
        const user = new User();

        user.email = email;
        user.password = password;

        await repository.update(
            id,
            user,
        );

        const updatedUser = await repository.findOne(id);
        res.json({user: updatedUser});
    }

}

export default new UserController();