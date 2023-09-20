import { HttpException, HttpStatus } from '@nestjs/common';
export class NotFoundException extends HttpException {
    constructor(id: number) {
        super(`Tag with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
}
