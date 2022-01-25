import UserRepository from "./userRepository";
import SessionRepository from "./sessionRepository";
import CategoryRepository from "./categoryRepository";
import BalanceRepository from "./balanceRepository";
import CategoryIconRepository from "./category_iconRepository";
const repositories = {
    users: UserRepository,
    session: SessionRepository,
    category: CategoryRepository,
    balance: BalanceRepository,
    category_icon: CategoryIconRepository,
};

export const RepositoryFactory = {
    get: (name: string) => repositories[name],
};
