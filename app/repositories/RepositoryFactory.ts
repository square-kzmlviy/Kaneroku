import UserRepository from "./userRepository";
import SessionRepository from "./sessionRepository";
const repositories = {
    users: UserRepository,
    session: SessionRepository,
};

export const RepositoryFactory = {
    get: (name: string) => repositories[name],
};
