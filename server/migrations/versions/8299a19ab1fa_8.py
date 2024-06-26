"""8

Revision ID: 8299a19ab1fa
Revises: f593ab14c8dd
Create Date: 2024-05-21 12:22:01.640786

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8299a19ab1fa'
down_revision = 'f593ab14c8dd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('exercise', schema=None) as batch_op:
        batch_op.add_column(sa.Column('push_pull', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('difficulty', sa.String(), nullable=True))
        batch_op.add_column(sa.Column('img', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('exercise', schema=None) as batch_op:
        batch_op.drop_column('img')
        batch_op.drop_column('difficulty')
        batch_op.drop_column('push_pull')

    # ### end Alembic commands ###
