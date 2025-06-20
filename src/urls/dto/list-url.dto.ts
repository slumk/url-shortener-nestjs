import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { IPaginateFind } from "utils/generic-interfaces/IPaginateFind";

export class ListURLParams implements IPaginateFind {
    @ApiProperty({ default: 10 })
    @Type(() => Number)
    @IsNumber()
    limit: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    searchText?: string;

    @ApiProperty({ default: 0})
    @Type(() => Number)
    @IsNumber()
    skip: number;
}