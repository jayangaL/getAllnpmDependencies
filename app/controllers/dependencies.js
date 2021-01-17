const request = require('request')

exports.get_all_dependencies = (req, res, next) => {

    res.setHeader('Content-Type', 'application/json')
    let listDependencies = [];
    let listDependenciesMap = {};

    // async function recurse(url)
    const recurse = (url) => {

        const dependencyGetUrl = "http://registry.npmjs.org/" + url + "/latest"
        console.log(dependencyGetUrl)

        request.get(dependencyGetUrl, function (error, response, body) {

            listDependenciesMap[url] = true;

            if (JSON.parse(body).dependencies > 0 || JSON.parse(body).dependencies != null) {
                let obj = JSON.parse(body).dependencies;
                console.log(obj);


                return process(obj);
            } else {
                if (Object.values(listDependenciesMap).indexOf(false) === -1) {
                    console.log("end");
                    res.status(200).json({ message: listDependencies });
                } else {
                    console.log("in progress");
                }
            }
        });
    }

    const process = (result) => {
        if (result) {

            for (let i = 0; i < Object.keys(result).length; i++) {
                if (listDependencies.indexOf(Object.keys(result)[i]) === -1) {
                    console.log(Object.keys(result)[i]);
                    listDependencies.push(Object.keys(result)[i]);
                    listDependenciesMap[Object.keys(result)[i]] = false;
                    recurse(Object.keys(result)[i]);
                }

            }
            if (Object.values(listDependenciesMap).indexOf(false) === -1) {
                console.log("end");
                res.status(200).json({ message: listDependencies });
            } else {
                console.log("in progress");
            }


        };
        if (Object.values(listDependenciesMap).indexOf(false) === -1) {
            console.log("end");
            res.status(200).json({ message: listDependencies });
        } else {
            console.log("in progress");
        }
    };

    recurse(req.params.dependenciesName);


}