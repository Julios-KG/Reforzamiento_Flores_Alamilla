interface ITermsItems {
    idTermsItem: number,
    term: string,
}

export interface ITerms {
    idTerms: number,
    title: string,
    termsItem: ITermsItems[]
}