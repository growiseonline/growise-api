

export interface IPresentation<PresentationInput, PrensentationOutput> {
    execute(props: PresentationInput): Promise<PrensentationOutput>
}