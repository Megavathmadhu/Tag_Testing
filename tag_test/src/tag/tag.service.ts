import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { TagDto } from './tag.tagDto';
import { NotFoundException } from './exceptions/tag.exception';
// import { retry } from 'rxjs';

@Injectable()
export class TagService {

    constructor(private readonly entityManager: EntityManager) { }

    private readonly Table_Name = 'tags_test';

    async getAllDataFromTable(): Promise<any[]> {
        const query = `SELECT * FROM ${this.Table_Name}`;
        const result = await this.entityManager.query(query);
        // console.log(result);
        return result;
    }



    async findOneTag(id: number): Promise<[]> {
        const query = `SELECT * FROM ${this.Table_Name} where id =${id}`;
        try {
            const result = await this.entityManager.query(query);
            return result;
        } catch (error) {
            throw new NotFoundException(id);
        }
    }



    async searchForPattern(searchdata: TagDto) {
        const { title } = searchdata;
        //console.log(title);
        const query = `SELECT * FROM ${this.Table_Name}`;
        let result = await this.entityManager.query(query);

        let trimmedSearchdata = title.trim();
        const res = result.filter(t => t.title && t.title.trim().includes(trimmedSearchdata))
        return res;
    }



    async updateTags(searchdata: TagDto, updateData: TagDto) {

        const { title } = searchdata;
        const { parentid } = updateData;

        console.log(title);
        console.log(parentid);
        //Fetch data from the database
        const query = `SELECT * FROM ${this.Table_Name}`;
        let result = await this.entityManager.query(query);
        //Filter and modify the data
        let trimmedSearchdata = title.trim();
        const searchedtags = result.filter(t => t.title && t.title.trim().includes(trimmedSearchdata))
        // console.log(searchedtags) //working
        const updatedData = searchedtags.map((st) => {
            if (st.title.includes(trimmedSearchdata)) {
                return { ...st, parentid: parentid };
            }
        })
        //Update the database with modified data
        for (const updatedRecord of updatedData) {

            const updateQuery = `UPDATE ${this.Table_Name} SET parentid = $1 WHERE id = $2`;
            await this.entityManager.query(updateQuery, [updatedRecord.parentid, updatedRecord.id]);
        }
        //creating a row with parentid as id
        const createRow = `INSERT INTO ${this.Table_Name} (id, title, creation, modified)
                           VALUES ($1, $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`;
        await this.entityManager.query(createRow, [parentid, title]);

        return "updated";
    }


}


