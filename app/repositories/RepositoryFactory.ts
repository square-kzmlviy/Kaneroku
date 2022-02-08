import UserRepository from "./userRepository";
import SessionRepository from "./sessionRepository";
import CategoryRepository from "./categoryRepository";
import BalanceRepository from "./balanceRepository";
import CategoryIconRepository from "./category_iconRepository";
import BalanceSummarizeRepository from "./balanceSummarizeRepository";
const repositories = {
    users: UserRepository,
    session: SessionRepository,
    category: CategoryRepository,
    balance: BalanceRepository,
    category_icon: CategoryIconRepository,
    balance_summarize: BalanceSummarizeRepository,
};

export const RepositoryFactory = {
    get: (name: string) => repositories[name],
};
