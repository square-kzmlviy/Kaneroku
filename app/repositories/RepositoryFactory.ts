import UserRepository from "./userRepository";
import SessionRepository from "./sessionRepository";
import CategoryRepository from "./categoryRepository";
import BalanceRepository from "./balanceRepository";
const repositories = {
    users: UserRepository,
    session: SessionRepository,
    category: CategoryRepository,
    balance: BalanceRepository,
};

export const RepositoryFactory = {
    get: (name: string) => repositories[name],
};
