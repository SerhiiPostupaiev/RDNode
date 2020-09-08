module.exports = {
  up(queryInterface, DataTypes) {
    return queryInterface.addColumn('Users', 'updatedAt', {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: Date.now()
    });
  },

  down: queryInterface => queryInterface.removeColumn('Event', 'updatedAt'),
};
