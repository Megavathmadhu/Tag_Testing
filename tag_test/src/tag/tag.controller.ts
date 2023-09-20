import { Body, Controller, Get, Logger, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagDto } from './tag.tagDto';

@Controller('tags')
export class TagController {
    constructor(private readonly tagService: TagService) { }

    private readonly logger = new Logger(TagController.name);

    @Get('/alltags')
    async getDataFromTable() {
        this.logger.log('Get All Tags')
        const data = await this.tagService.getAllDataFromTable();
        return data;
    }

    @Get(':id')
    async getOne(@Param('id') id: number) {
        this.logger.log('Get One Tags')
        try {
            return this.tagService.findOneTag(id)
        } catch (error) {
            throw new NotFoundException('Tag not found with given Id')
        }

    }

    @Get()
    searchPattern(@Query() searchdata: TagDto) {
        try {
            this.logger.log('Search Pattern to Search a Specific Tag')
            return this.tagService.searchForPattern(searchdata);
        } catch (error) {
            this.logger.error(`Error executing SQL query:', ${error}`)
            throw new NotFoundException('Error executing SQL query');
        }
    }

    @Post()
    UpadateTagValue(@Query() searchdata: TagDto, @Body() updateData: TagDto) {
        try {
            //const { parentid } = updateData;
            this.logger.log('Search Pattern to Search a Specific Tag and Update it')

            return this.tagService.updateTags(searchdata, updateData);
        } catch (error) {
            this.logger.error(`Error executing SQL query:', ${error}`)
            throw new NotFoundException('Error executing SQL query')
        }
    }


}




