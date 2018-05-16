import itertools
from app.models import Table, Column, Row, Cell
from rest_framework import serializers

class ColumnSerializer(serializers.ModelSerializer):

    id = serializers.ModelField(model_field=Column._meta.get_field('id'), required=False)
    """
    name = serializers.ModelField(model_field=Column._meta.get_field('name'), required=True)
    label = serializers.ModelField(model_field=Column._meta.get_field('label'), required=True)
    type = serializers.ModelField(model_field=Column._meta.get_field('type'), required=True)
    options = serializers.ModelField(model_field=Column._meta.get_field('options'), required=False)
    nullable = serializers.ModelField(model_field=Column._meta.get_field('nullable'), required=False)
    """
    
    class Meta:
        model = Column
        fields = ('id', 'name', 'label', 'type', 'options', 'nullable')

class CellSerializer(serializers.ModelSerializer):

    id = serializers.ModelField(model_field=Cell._meta.get_field('id'), required=False)
    
    class Meta:
        model = Cell
        fields = ('id', 'column', 'value')

class RowSerializer(serializers.ModelSerializer):
    cells = CellSerializer(many=True)

    class Meta:
        model = Row
        fields = ('cells')


class TableColumnsSerializer(serializers.ModelSerializer):
    columns = ColumnSerializer(many=True)
    
    # rowset = Row.objects.all()
    # rows = RowSerializer(rowset, many=True)
    # rows = RowSerializer(many=True)

    class Meta:
        model = Table
        # fields = ('id','name', 'description','columns','rows')
        fields = ('id','name', 'description','columns')

    def create(self, validated_data):
        columns_data = validated_data.pop('columns')
        # rows_data = validated_data.pop('rows')
        table = Table.objects.create(**validated_data)
        for col_data in columns_data:
            Column.objects.create(table=table, **col_data)
        # for row_data in rows_data:
        #    Row.objects.create(table=table, **row_data)
        return table

    def update(self, instance, validated_data):
    
        not_to_delete = [] # Rows and Columns Not to delete

        columns_data = validated_data.pop('columns')
        columns = instance.columns.all()
        
        # rows_data = validated_data.pop('rows')
        # rows = instance.rows.all()
        
        # for field in validated_data:
        #    instance.__setattr__(field, validated_data.get(field))
        
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        
        for col_data in columns_data:
            if columns:
                col = [x for x in columns if x.id == col_data.get('id')]
                if len(col) > 0:
                    column = Column.objects.get(id=col[0].id)
                    for field in col_data:
                        column.__setattr__(field, col_data.get(field))
                    column.table = instance
                    column.save()
                    not_to_delete.append(col[0].id)
                else:
                    Column.objects.create(table = instance, **col_data)
            else:
                Column.objects.create(table = instance, **col_data)
    
        if columns: # delete old columns
            for col in columns:
                if col.id not in not_to_delete:
                    Column.objects.filter(id=col.id).delete()
        """
        not_to_delete = []
        
        for row_data in rows_data:
            if rows:
                ro = [x for x in rows if x.id == row_data.get('id')]
                if len(ro) > 0:
                    row = Rows.objects.get(id=ro[0].id)
                    for field in row_data:
                        row.__setattr__(field, row_data.get(field))
                    row.table = instance
                    row.save()
                    not_to_delete.append(ro[0].id)
                else:
                    Row.objects.create(table = instance, **row_data)
            else:
                Row.objects.create(table = instance, **row_data)
    
        if rows: # delete old columns
            for ro in rows:
                if ro.id not in not_to_delete:
                    Row.objects.filter(id=ro.id).delete()
        """

        return instance

