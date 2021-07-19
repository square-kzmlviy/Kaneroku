import UserRepository from "./userRepository";
import SessionRepository from "./sessionRepository";
import CategoryRepository from "./categoryRepository";
const repositories = {
    users: UserRepository,
    session: SessionRepository,
    category: CategoryRepository,
};

export const RepositoryFactory = {
    get: (name: string) => repositories[name],
};
