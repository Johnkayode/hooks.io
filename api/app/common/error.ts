interface ApiErrorProps {
    message: string;
    status_code?: number;
  }
  
export default class APIError extends Error {
    status_code?: number;

    constructor(props: ApiErrorProps) {
        super();
        this.message = props.message;
        this.status_code = props.status_code;
    }
}