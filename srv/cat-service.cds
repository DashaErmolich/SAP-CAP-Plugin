using my.bookshop as my from '../db/schema';

@path: '/app'
@requires: 'any'
service CatalogService {
    entity Books as projection on my.Books;
}