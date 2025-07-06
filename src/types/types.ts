
export interface IBook {
    _id: string;
    title: string;
    author: string;
    genre: string;
    isbn: string;
    description?: string;
    copies: number;
    available: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface BorrowSummaryItem {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
  borrowers: string[];
}

// interface BorrowSummaryResponse {
//   data: BorrowSummaryItem[];
// }