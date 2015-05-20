
exports.combotree = function(req, res) {
    res.json([{
        "id":1,
        "text":"My Documents",
        "children":[{
            "id":11,
            "text":"Photos",
            "state":"closed",
            "children":[{
                "id":111,
                "text":"Friend"
            },{
                "id":112,
                "text":"Wife"
            },{
                "id":113,
                "text":"Company"
            }]
        },{
            "id":12,
            "text":"Program Files",
            "children":[{
                "id":121,
                "text":"Intel"
            },{
                "id":122,
                "text":"Java",
                "attributes":{
                    "p1":"Custom Attribute1",
                    "p2":"Custom Attribute2"
                }
            },{
                "id":123,
                "text":"Microsoft Office"
            },{
                "id":124,
                "text":"Games",
                "checked":true
            }]
        },{
            "id":13,
            "text":"index.html"
        },{
            "id":14,
            "text":"about.html"
        },{
            "id":15,
            "text":"welcome.html"
        }]
    }]);
};

exports.datagrid = function(req, res) {
    var page = res.page || 1;
    var rows = res.rows || 10;
    var offset = (page - 1) * rows;

    res.json([
        {
         "itemid": "11222",
            "productid": "dsdsfdfs",
            "listprice": "23223",
            "unitcost": "sdfsd",
            "attr1": "xxvzvxczcx",
            "status": "ddf",
            "status121": "fdfsdf",
            "status12221": "fsdf"
        },
        {
            "itemid": "11222",
            "productid": "dsdsfdfs",
            "listprice": "23223",
            "unitcost": "sdfsd",
            "attr1": "xxvzvxczcx",
            "status": "ddf",
            "status121": "fdfsdf",
            "status12221": "fsdf"
        },
        {
            "itemid": "11222",
            "productid": "dsdsfdfs",
            "listprice": "23223",
            "unitcost": "sdfsd",
            "attr1": "xxvzvxczcx",
            "status": "ddf",
            "status121": "fdfsdf",
            "status12221": "fsdf"
        },
        {
            "itemid": "11222",
            "productid": "dsdsfdfs",
            "listprice": "23223",
            "unitcost": "sdfsd",
            "attr1": "xxvzvxczcx",
            "status": "ddf",
            "status121": "fdfsdf",
            "status12221": "fsdf"
        },
        {
            "itemid": "11222",
            "productid": "dsdsfdfs",
            "listprice": "23223",
            "unitcost": "sdfsd",
            "attr1": "xxvzvxczcx",
            "status": "ddf",
            "status121": "fdfsdf",
            "status12221": "fsdf"
        },
        {
            "itemid": "11222",
            "productid": "dsdsfdfs",
            "listprice": "23223",
            "unitcost": "sdfsd",
            "attr1": "xxvzvxczcx",
            "status": "ddf",
            "status121": "fdfsdf",
            "status12221": "fsdf"
        },
        {
            "itemid": "11222",
            "productid": "dsdsfdfs",
            "listprice": "23223",
            "unitcost": "sdfsd",
            "attr1": "xxvzvxczcx",
            "status": "ddf",
            "status121": "fdfsdf",
            "status12221": "fsdf"
        },
        {
            "itemid": "11222",
            "productid": "dsdsfdfs",
            "listprice": "23223",
            "unitcost": "sdfsd",
            "attr1": "xxvzvxczcx",
            "status": "ddf",
            "status121": "fdfsdf",
            "status12221": "fsdf"
        },
        {
            "itemid": "11222",
            "productid": "dsdsfdfs",
            "listprice": "23223",
            "unitcost": "sdfsd",
            "attr1": "xxvzvxczcx",
            "status": "ddf",
            "status121": "fdfsdf",
            "status12221": "fsdf"
        },
        {
            "itemid": "11222",
            "productid": "dsdsfdfs",
            "listprice": "23223",
            "unitcost": "sdfsd",
            "attr1": "xxvzvxczcx",
            "status": "ddf",
            "status121": "fdfsdf",
            "status12221": "fsdf"
        },
        {
            "itemid": "3434323233232323232",
            "productid": "jhjklklklklkl",
            "listprice": "986545",
            "unitcost": "axcxccxxc",
            "attr1": "xxvzvxczcx",
            "status": "sdsaaasfgg",
            "status121": "sdsddsfgfg",
            "status12221": "bvjhjhhg"
        },
        {
            "itemid": "14545r445451222",
            "productid": "aaassassasasa",
            "listprice": "2332456565",
            "unitcost": "sdfsd",
            "attr1": "bvnbnbnb",
            "status": "wewe23sdweewwe",
            "status121": "sccxfbhghg",
            "status12221": "zxzxassaas"
        },
    ]);
};