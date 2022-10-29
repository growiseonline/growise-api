import { Tennant } from "../entity";
import { ITennantEntity } from "./ITennantEntity";

export interface ITennantRepository {
    insert: (props: ITennantEntity) => Promise<void>
    findBySlug: (slug: string) => Promise<Tennant | null>
}