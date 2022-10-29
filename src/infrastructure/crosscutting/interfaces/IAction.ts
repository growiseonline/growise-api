
export interface IAction<ActionInput, ActionOutput> {
    execute(props: ActionInput): Promise<ActionOutput>
}