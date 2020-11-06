module.exports = function(app, Book){

    // get all books
    app.get('/api/books', function(req, res){
        Book.find(function(err, books){
            if(err) return res.status(500).send({error: 'database failure'})
            res.json(books);
        })
    })

    //get single book
    app.get('/api/books/:book_id', function(req, res) {
        Book.findOne({_id: req.params.book_id}, function(err, book){
            if(err) return res.status(500).json({error: err});
            if(!book) return res.status(404).json({error: 'book not found'});
            res.json(book);
        })
    });
    //에러부분 잘 모르겠어요 ㅜ

    //get book by author
    app.get('/api/books/author/:author', function(req, res){
        Book.find({author: req.params.author}, {_id: 0, title: 1, published_date: 1},  function(err, books){
            if(err) return res.status(500).json({error: err});
            if(books.length === 0) return res.status(404).json({error: 'book not found'});
            res.json(books);
        })
    });


    //create book
    app.post('/api/books', function(req, res){
        const book = new Book();
        book.title = req.body.name;
        book.author = req.body.author;
        book.date = new Date(req.body.date);

        book.save(function(err){
            if(err){
                console.err(err);
                res.json({result: 0});
                return;
            }
            res.json({result: 1});
        });
    });

    //update the book
    app.put('/api/books/:book_id', function(req, res){
        // id는 book객체마다 자동으로 생성되는거지요?
        //err랑 book객체를 받아오는 것?
        Book.findById(req.params.book_id, function(err, book) {
            if(err) return res.status(500).json({ error: 'database Failure'});
            if(!book) return res.status(404).json({error: 'book not found'});

            if(req.body.title) book.title = req.body.title;
            if(req.body.author) book.author = req.body.author;
            if(req.body.date) book.date = req.body.date;

            book.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'book updated'})
            })
        })
    });

    app.delete('/api/books/:book_id', function(req, res){
        Book.remove({_id: req.params.book_id}, function(err, output){
            if(err) return res.status(500).json({error: "database failure"});

            res.status(204).end();
        })
    });
}
