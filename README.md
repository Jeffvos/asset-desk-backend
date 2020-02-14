AssetDesk backend api

Paths

GET
/assets/

Lists all assets


GET
/assets/{id}

Lists single asset


DELETE
/assets/{id}

Deletes single asset


POST
/assets/add

Adds new asset

{
  "assetid": "1234",
  "assetsn": "40404",
  "assetvendor": "vendor",
  "assetmodel": "model",
	"assetstatus":"Ready",
	"assetdep":"dev"
}


POST
/assets/update/{id}
updates single asset

{
  "assetsn": "40404",
  "assetvendor": "vendor",
  "assetmodel": "model",
	"assetstatus":"Ready",
	"assetdep":"dev"
}


POST
/assets/update/{id}/user
adds user to single asset 

{
  "assetuser":"user"
}
