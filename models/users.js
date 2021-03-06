module.exports = (Waterline) => {
  const Users = Waterline.Collection.extend({
    identity: 'users',
    connection: 'postgresql',
    tableName: 'users',
    adapter: 'postgresql',
    migrate: 'safe',
    autoPK: false,

    autoCreatedAt: false,
    autoUpdatedAt: false,

    attributes: {
      id: {
        type: 'string',
        primaryKey: true,
        columnName: 'id'
      },
      email: {
        type: 'string',
        required: true,
        unique: true,
      },
      password: {
        type: 'string',
        required: true,
        unique: true,
      },
      accountType: {
        type: 'string',
        columnName: 'account_type',
        defaultsTo: 'user'
      },
      accountStatus: {
        type: 'string',
        columnName: 'account_status',
        defaultsTo: 'active'
      },
      createdOn: {
        type: 'datetime',
        columnName: 'created_on',
        defaultsTo: function defaultsTo() {
          return new Date();
        },
      },
      toJSON: function() {
        const obj = this.toObject();

        //strip out password in JSON response
        delete obj.password;
        return obj;
      }
    },
  });

  return Users;
};
